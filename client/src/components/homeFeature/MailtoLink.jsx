import React from "react";

const MailtoLink = () => {
  const email = "someone@example.com";
  const subject = "Hello";
  const body = "This is a test email";

  return (
    <a
      className="bg-blue-400 shadow-md text-black text-sm text-center p-2 rounded-sm"
      href={`mailto:${email}?subject=${encodeURIComponent(
        subject
      )}&body=${encodeURIComponent(body)}`}
    >
      Send Email
    </a>
  );
};

export default MailtoLink;
