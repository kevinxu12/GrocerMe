/**
 * @file Email client helper
 * To connect your email as the sender of GrocerMe's behalf, go to your personal email and create an application specific password.
 * Set this in an env variable
 *
 * If the client isn't working still due to a 302 error, try to 
Enable less secure apps - https://www.google.com/settings/security/lesssecureapps
Disable Captcha temporarily so you can connect the new device/server - https://accounts.google.com/b/0/displayunlockcaptcha
 *
 * We should eventually migrate away from personal accounts on behalf of GrocerMe to an official email account?
 * @author Kevin Xu
 */
import { logger } from '@src/app';
import { google } from '@src/config';
import nodemailer from 'nodemailer';
import smtpTransport from 'nodemailer-smtp-transport';

const transporter = nodemailer.createTransport(
  smtpTransport({
    service: 'gmail',
    host: 'smtp.gmail.com',
    auth: {
      type: 'OAuth2',
      user: google.mail_name,
      pass: google.mail_password,
    },
  }),
);
export type MailOptions = {
  to: string;
  subject: string;
  text: string;
};

/**
 * Sends an email to a specified user, with specified subject and text
 *
 * @param {MailOptions} options Mail options to send an email with
 * @returns {Promise} an asynchronous send email feature
 */
export async function sendInternalEmail(options: MailOptions) {
  return new Promise((resolve, reject) =>
    transporter.sendMail(options, function (error, info) {
      if (error) {
        logger.error(error);
        reject(false);
      } else {
        logger.info('Email sent: ' + info.response);
        resolve(true);
      }
    }),
  );
}
