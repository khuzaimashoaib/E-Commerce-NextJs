import Link from 'next/link'
import React from 'react'

const ForgetPasswordForm = () => {
  return (
    <div className="lost-password-section section-padding fix">
            <div className="container">
                <div className="reset-password-form">
                    <h2>Reset Your Password</h2>
                    <p className="description">Your email address will not be published. Required fields marked *</p>
                    
                    <form>
                        <div className="form-group">
                            <label >Email<span>*</span></label>
                            <input type="email" id="email" name="email" required/>
                        </div>
                        
                        <button type="submit" className="theme-btn">Submit Now</button>
                    </form>
                    
                    <p className="back-link">Back to? <Link href="/login">Login</Link></p>
                </div>
            </div>
        </div>
  )
}

export default ForgetPasswordForm
