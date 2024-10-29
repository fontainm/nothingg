<script setup></script>

<template>
  <section class="privacy-policy">
    <h2>Privacy Policy</h2>

    <div class="container">
      <p>Effective Date: 2024-10-31</p>

      <h3>Introduction</h3>
      <p>
        We respect your privacy and are committed to protecting your personal information. This
        privacy policy explains how {{ $appStore.appTitle }} collects, uses, and safeguards your
        data when you use our website and services.
      </p>

      <h3>Information We Collect</h3>
      <p>We collect the following information when you use {{ $appStore.appTitle }}:</p>
      <ul>
        <li><strong>Email Address:</strong> Required for signing up and logging in.</li>
        <li>
          <strong>Password:</strong> Used to secure your account (stored securely using encryption).
        </li>
        <li><strong>Optional Profile Information:</strong> Such as name, if provided.</li>
        <li>
          <strong>Log Data:</strong> Automatically collected information such as IP address and
          browser type when you interact with our website.
        </li>
      </ul>

      <h3>How We Use Your Information</h3>
      <p>We use your information for the following purposes:</p>
      <ul>
        <li>To create and manage your account.</li>
        <li>To allow you to log in and out of your account.</li>
        <li>
          To communicate with you regarding updates, security issues, or changes to your account.
        </li>
        <li>For security and fraud prevention.</li>
      </ul>

      <h3>How We Protect Your Information</h3>
      <p>
        We implement industry-standard encryption and security measures to protect your personal
        data from unauthorized access, disclosure, or misuse. However, no method of transmission
        over the internet or electronic storage is 100% secure, and we cannot guarantee absolute
        security.
      </p>

      <h3>Cookies and Tracking Technologies</h3>
      <p>
        We do not use cookies or tracking technologies on our website. We respect your privacy and
        do not monitor your browsing habits.
      </p>

      <h3>Sharing Your Information</h3>
      <p>
        We do not share, sell, or rent your personal data to third parties. The only exception is if
        we are required by law to provide information to authorities.
      </p>

      <h3>Your Rights</h3>
      <p>As a user, you have the following rights:</p>
      <ul>
        <li><strong>Access:</strong> You can request access to your personal information.</li>
        <li>
          <strong>Correction:</strong> You can update or correct any incorrect information in your
          account settings.
        </li>
        <li>
          <strong>Deletion:</strong> You can delete your account at any time, and we will erase all
          associated data.
        </li>
      </ul>

      <h3>Data Retention</h3>
      <p>
        We retain your personal information for as long as you maintain an active account. If you
        delete your account, we will delete all of your data immediately unless required by law to
        retain it.
      </p>

      <h3>Children's Privacy</h3>
      <p>
        Our services are not intended for children under the age of 13. We do not knowingly collect
        personal information from children. If we become aware that we have collected personal
        information from a child without verification of parental consent, we will delete that
        information.
      </p>

      <h3>Changes to This Privacy Policy</h3>
      <p>
        We may update this privacy policy from time to time. If we make significant changes, we will
        notify you via email or by posting a prominent notice on our website. We encourage you to
        review this policy periodically.
      </p>

      <h3>Contact Information</h3>
      <p>
        If you have any questions about this privacy policy or our data practices, please contact us
        at:
        <a :href="`mailto:${$appStore.appEmail}`">{{ $appStore.appEmail }}</a>
      </p>
    </div>
  </section>
</template>

<style scoped lang="scss">
.privacy-policy .container {
  text-align: left;

  h3 {
    margin: 32px 0 16px 0;
  }

  ul {
    padding: 0 32px;
  }
}
</style>
