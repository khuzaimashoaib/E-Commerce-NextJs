import Stripe from "stripe";
import Order from "../../models/Order.js";

const getStripe = () => new Stripe(process.env.STRIPE_SECRET_KEY);

// @desc   Create Stripe checkout session
// @route  POST /api/stripe/create-session
export const createStripeSession = async (req, res) => {
  try {
    const stripe = getStripe();
    const { items, customerInfo, shipping, orderNumber } = req.body;

    if (!items || items.length === 0) {
      return res.status(400).json({ message: "No items in order" });
    }

    const lineItems = items.map((item) => ({
      price_data: {
        currency: "usd",
        product_data: {
          name: item.name,

          images: item.image
            ? [
                `${process.env.CLIENT_URL || "http://localhost:3000"}${item.image}`,
              ]
            : [],
        },
        unit_amount: Math.round(item.price * 100), // Stripe uses cents
      },
      quantity: item.quantity,
    }));

    if (shipping > 0) {
      lineItems.push({
        price_data: {
          currency: "usd",
          product_data: { name: "Shipping" },
          unit_amount: Math.round(shipping * 100),
        },
        quantity: 1,
      });
    }

    const session = await stripe.checkout.sessions.create({
      ui_mode: "embedded_page",
      mode: "payment",
      line_items: lineItems,
      customer_email: customerInfo?.email || undefined,
      payment_method_types: ["card"],
      return_url: `${process.env.CLIENT_URL || "http://localhost:3000"}/order-confirmation?session_id={CHECKOUT_SESSION_ID}&orderNumber=${orderNumber}`,
      metadata: {
        orderNumber,
        customerName: `${customerInfo?.firstName} ${customerInfo?.lastName}`,
      },
    });

    res.json({ clientSecret: session.client_secret });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc   Verify Stripe session + create order
// @route  POST /api/stripe/verify-session
export const verifyStripeSession = async (req, res) => {
  try {
    const stripe = getStripe();
    const { sessionId, orderData } = req.body;
    const session = await stripe.checkout.sessions.retrieve(sessionId);

    if (session.payment_status !== "paid") {
      return res.status(400).json({ message: "Payment not completed" });
    }

    const existingOrder = await Order.findOne({
      orderNumber: orderData.orderNumber,
    });
    if (existingOrder) {
      return res.json(existingOrder); // return existing if duplicate
    }

    const order = await Order.create({
      ...orderData,
      paymentMethod: "Card (Stripe)",
      paymentStatus: "paid",
      stripeSessionId: sessionId,
      status: "processing",
    });

    res.status(201).json(order);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
