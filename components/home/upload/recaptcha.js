import ReCAPTCHA from "react-google-recaptcha";

const RecaptchaComp = ({ recaptchaRef }) => (
  <ReCAPTCHA
    ref={recaptchaRef}
    size="invisible"
    sitekey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY}
  />
);

export default RecaptchaComp;
