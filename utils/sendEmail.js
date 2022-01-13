import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
  host: 'smtp.mailtrap.io',
  port: 2525,
  auth: {
    user: 'c3218cf45815e5',
    pass: 'd19586a4dedff6',
  },
});

const sendEmail = async (options) => {
  const message = {
    from: `${process.env.FROM_NAME} <${process.env.FROM_EMAIL}>`,
    to: options.email,
    subject: options.subject,
    html: options.message,
  };

  await transporter.sendMail(message);
};

export default sendEmail;
