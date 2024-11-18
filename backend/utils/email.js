import nodemailer from 'nodemailer'
import fs from 'fs-extra'
import path from 'path'
import { replacePlaceholders } from '../utils/helpers.js'
import { updateUserLastEmailSent } from '../controllers/users.js'

const getTemplate = async (filename) => {
  const templatePath = path.join(
    path.dirname(new URL(import.meta.url).pathname),
    '..',
    'templates',
    filename
  )

  const template = await fs.readFile(templatePath, 'utf-8')
  return template
}

const sendEmail = async (mailOptions) => {
  if (process.env.NODE_ENV === 'test') {
    console.log('Email sending skipped in test environment')
    return
  }

  const transporter = nodemailer.createTransport({
    host: 'bootes.uberspace.de',
    port: 587,
    secure: false,
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  })

  await transporter.sendMail(mailOptions)
  await updateUserLastEmailSent(mailOptions.to)
}

export const sendVerificationEmail = async (email, token) => {
  const template = await getTemplate('verificationEmail.html')
  const htmlContent = replacePlaceholders(template, {
    verificationUrl: `${process.env.DOMAIN}/users/verify?token=${token}`,
  })

  const mailOptions = {
    from: 'support@nothingg.space',
    to: email,
    subject: 'Verify Your Email Address',
    html: htmlContent,
  }

  await sendEmail(mailOptions)
}

export const sendEmailChangeVerificationEmail = async (email, token) => {
  const template = await getTemplate('emailChangeVerificationEmail.html')
  const htmlContent = replacePlaceholders(template, {
    verificationUrl: `${process.env.DOMAIN}/users/verify-change-email?token=${token}`,
  })

  const mailOptions = {
    from: 'support@nothingg.space',
    to: email,
    subject: 'Verify Your New Email Address',
    html: htmlContent,
  }

  await sendEmail(mailOptions)
}

export const sendPasswordRecoveryEmail = async (email, token) => {
  const template = await getTemplate('passwordRecoveryEmail.html')
  const htmlContent = replacePlaceholders(template, {
    recoveryUrl: `${process.env.DOMAIN}/users/reset-password?token=${token}`,
  })

  const mailOptions = {
    from: 'support@nothingg.space',
    to: email,
    subject: 'Reset your password',
    html: htmlContent,
  }

  await sendEmail(mailOptions)
}
