<?php

Stripe\Stripe::setApiKey('sk_test_51OqKpJL1YZJ31JLFwfCTMqovmbGbjkjMQULcGutdsCxV3aWQMDFUXYeDmGE1tEqwcsA0SlIRobpkMxqo2OirenBx00Xu7F65gh');

// You can find your endpoint's secret in your webhook settings
$endpoint_secret = 'whsec_3ffc8d92d2bbe65e85e557a25da492843f498bfdc5873376539c292fd4966750';

$payload = @file_get_contents('php://input');
$sig_header = $_SERVER['HTTP_STRIPE_SIGNATURE'];
$event = null;

try {
  $event = \Stripe\Webhook::constructEvent(
    $payload, $sig_header, $endpoint_secret
  );
} catch(\UnexpectedValueException $e) {
  // Invalid payload
  http_response_code(400);
  
  exit();
} catch(\Stripe\Exception\SignatureVerificationException $e) {
  // Invalid signature
  http_response_code(400);
  exit();
}

function fulfill_order($line_items) {
  // todo fill me in
  error_log("Fulfilling order...");
  error_log($line_items);
}

// Handle the checkout.session.completed event
if ($event->type == 'checkout.session.completed') {
  // Retrieve the session. If you require line items in the response, you may include them by expanding line_items.
  $session = \Stripe\Checkout\Session::retrieve([
    'id' => $event->data->object->id,
    'expand' => ['line_items'],
    'success_url' => "https://knowledgespheres.org",
  ]);
    
  $line_items = $session->line_items;
  // Fulfill the purchase...
  fulfill_order($line_items);

  header("location:https://knowledgespheres.org");
}

http_response_code(200);
?>