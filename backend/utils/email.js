import nodemailer from 'nodemailer'
import fs from 'fs-extra'
import path from 'path'
import { replacePlaceholders } from '../utils/helpers.js'

const setupTransporter = () => {
  return nodemailer.createTransport({
    host: 'bootes.uberspace.de',
    port: 587,
    secure: false,
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  })
}

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

export const sendVerificationEmail = async (email, token) => {
  const transporter = setupTransporter()
  const template = await getTemplate('verificationEmail.html')

  const htmlContent = replacePlaceholders(template, {
    verificationUrl: `${process.env.DOMAIN}/users/verify?token=${token}`,
  })

  const mailOptions = {
    from: 'support@nothingg.space',
    to: email,
    subject: 'Verify Your Email',
    html: htmlContent,
  }
  await transporter.sendMail(mailOptions)
}

export const sendPasswordRecoveryEmail = async (email, token) => {
  const transporter = setupTransporter()
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
  await transporter.sendMail(mailOptions)
}
