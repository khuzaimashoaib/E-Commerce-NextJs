import Link from "next/link";
import { Fragment } from "react";


export default function Breadcrumb({ title, bgImage, items = [] }) {
  return (
    <div
      className="breadcrumb-wrapper bg-cover"
      style={{
        backgroundImage: bgImage ? `url('${bgImage}')` : undefined,
      }}
    >
      <div className="container">
        <div className="page-heading">

          {/* Page Title */}
          <div className="breadcrumb-sub-title">
            <h1 className="wow fadeInUp" data-wow-delay=".3s">
              {title}
            </h1>
          </div>

          {/* Breadcrumb Trail */}
         <ul className="breadcrumb-items wow fadeInUp" data-wow-delay=".5s">
            {items.map((item, index) => (
              <Fragment key={index}>
                {/* Separator — show before every item except the first */}
                {index > 0 && <li>/</li>}
 
                <li>
                  {item.href ? (
                    <Link href={item.href}>
                      {item.icon && <i className={item.icon}></i>}{" "}
                      {item.label}
                    </Link>
                  ) : (
                    item.label
                  )}
                </li>
              </Fragment>
            ))}
          </ul>

        </div>
      </div>
    </div>
  );
}
