import express from 'express';
import nodemailer from 'nodemailer';
import { google } from 'googleapis';

const router = express.Router();

const CLIENT_ID = '440013674915-rj0fihk6rupa1kg796frc8md4s51nskc.apps.googleusercontent.com';
const CLIENT_SECRET = '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';
const REDIRECT_URI = 'https://developers.google.com/oauthplayground';
const REFRESH_TOKEN = '1//04ixWWY8z5Y90CgYIARAAGAQSNwF-L9Irzzy13pi2XttLUCoSMz4Hq0Z0XqDvva1_gBj8EWUg5J30WQqfUiuRSVZdR3uscavNrwo';

const oAuth2Client = new google.auth.OAuth2(CLIENT_ID,
  CLIENT_SECRET,
  REDIRECT_URI);

oAuth2Client.setCredentials({refresh_token:REFRESH_TOKEN})

const createTrans = async () => nodemailer.createTransport({
  service: "gmail",
  auth: {
    type: "OAuth2",
    user: "bducvj@gmail.com",
    clientId: CLIENT_ID,
    clientSecret: CLIENT_SECRET,
    refreshToken: REFRESH_TOKEN,
    accessToken: await oAuth2Client.getAccessToken()
  }
});
const sendEmail = async ({to, subject, html}) => {
  const transporter = await createTrans()

  const configEmail = {
      from: '"AgendaME" <noreply@agendame.info>',
      to,
      subject,
      html
  }

  const info = await transporter.sendMail(configEmail)

  console.log("Message sent: %s", info.messageId);

  return info;
}
export default sendEmail;