<script setup></script>

<template>
  <section class="terms">
    <h2>Terms & Conditions</h2>

    <div class="container">
      <p>Effective Date: 2024-10-31</p>

      <h3>1. Introduction</h3>
      <p>
        Welcome to {{ $appStore.appTitle }}. By using our website and services, you agree to comply
        with and be bound by these Terms and Conditions. If you do not agree with any part of these
        terms, you should not use our service.
      </p>

      <h3>2. Eligibility</h3>
      <p>
        You must be at least 13 years old to use this service. By using {{ $appStore.appTitle }},
        you warrant that you meet this requirement.
      </p>

      <h3>3. Use of the Service</h3>
      <p>
        You agree to use {{ $appStore.appTitle }} for lawful purposes only. You must not engage in
        any harmful, fraudulent, or illegal activities when using our service. Any misuse of the
        service can result in account suspension or termination.
      </p>

      <h3>4. Account Management</h3>
      <p>
        You are responsible for maintaining the confidentiality of your account credentials and
        ensuring all information is accurate. We reserve the right to suspend or terminate accounts
        at our discretion.
      </p>

      <h3>5. Intellectual Property</h3>
      <p>
        The logo, branding, and content of {{ $appStore.appTitle }} are the exclusive property of
        the service and are protected by intellectual property laws. You are prohibited from using
        these without permission.
      </p>

      <h3>6. Modifications to the Service</h3>
      <p>
        We reserve the right to modify, suspend, or discontinue any part of the service at any time
        without notice. We will not be liable for any changes to the availability or functionality
        of the service.
      </p>

      <h3>7. Limitation of Liability</h3>
      <p>
        {{ $appStore.appTitle }} provides services on an "as is" and "as available" basis. We do not
        guarantee uninterrupted service or that the service will be free of errors or harmful
        components. We are not liable for any damages resulting from the use of the service.
      </p>

      <h3>8. Termination</h3>
      <p>
        Both you and {{ $appStore.appTitle }} have the right to terminate your account at any time.
        Upon termination, you will no longer have access to your account, and your data will be
        deleted.
      </p>

      <h3>9. {{ $appStore.appTitle }} PRO Plan</h3>
      <ul>
        <li>
          Payment: The {{ $appStore.appTitle }} PRO plan is a one-time payment of 5€, granting you
          lifetime access to the same features as the free tier.
        </li>
        <li>No Refunds: Payments for {{ $appStore.appTitle }} PRO are non-refundable.</li>
        <li>
          Support: By purchasing {{ $appStore.appTitle }} PRO, you acknowledge that your payment
          supports the development and maintenance of this project by a solo developer.
        </li>
      </ul>

      <h3>10. Governing Law</h3>
      <p>
        These Terms and Conditions are governed by and construed in accordance with the laws of
        Austria, and you submit to the exclusive jurisdiction of the courts in that location.
      </p>

      <h3>11. Changes to the Terms</h3>
      <p>
        We may update these Terms and Conditions from time to time. Any changes will be posted on
        this page, and you are encouraged to review them periodically. Continued use of the service
        constitutes acceptance of any changes.
      </p>

      <h3>12. Changes to the Service</h3>
      <p>
        We reserve the right to modify or discontinue any aspect of the service, including the
        {{ $appStore.appTitle }} PRO plan, at any time without prior notice.
      </p>

      <h3>13. Contact Information</h3>
      <p>
        If you have any questions about these Terms and Conditions, please contact us at:
        <a :href="`mailto:${$appStore.appEmail}`">{{ $appStore.appEmail }}</a>
      </p>
    </div>
  </section>
</template>

<style scoped lang="scss">
.terms .container {
  text-align: left;

  h3 {
    margin: 32px 0 16px 0;
  }

  ul {
    padding: 0 32px;
  }
}
</style>
