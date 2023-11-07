<?php
require_once('vendor/autoload.php');
$client = new \GuzzleHttp\Client();  
$api_url = 'https://api.rd.services/platform/events?event_type=conversion';
$auth_token;
function verify_token() {
    global $client, $api_url, $auth_token;
    $response = $client->request('GET', $api_url, [
        'headers'=> ['Authorization'=> "Bearer $auth_token"]
    ]);
    $code = $response->getStatusCode();
    if ($code == 200) {
        echo "Successfully validated authorization token, submitting request...";
    } elseif ($code == 401) {
        echo "Token expired, refreshing token...";
        renew_token();
    } else {
        echo "Failed to verify token.";
    }
};
function renew_token() {
    global $client, $auth_token;
    $client_id = '09e82c62-dab7-4e15-91fb-e2b94ef9a137';
    $client_secret = 'a3a940508f0a40d4b4ad8989dbe37fdb';
    $refresh_token = 'OTARZRQqADPu5QsHi90YvcEQr_kBfQZ9OKzqjqtF5F0';
    $token_url = 'https://api.rd.services/auth/token';
    $response = $client->request('POST', $token_url, [
        'body'=> [
            'grant_type'=> 'refresh_token',
            'refresh_token'=> $refresh_token,
            'client_id'=> $client_id,
            'client_secret'=> $client_secret
        ],
        'headers'=> [
            'accept' => 'application/json',
            'content-type' => 'application/json',
        ]
    ]);
    $code = $response->getStatusCode();
    $body = $response->getBody();
    if ($code == 200) {
        $auth_token = $body['token_data'];
        $refresh_token = $body['refresh_token'];
        echo "Authorization token renewed successfully.";
    } else {
        echo "Failed to renew token.";
    }
};
function post_lead($name, $mail, $tags) {
    global $client, $auth_token;
    verify_token();
    $response = $client->request('POST', 'https://api.rd.services/platform/events?event_type=conversion', [
        'body' => [
            "event_type" => "CONVERSION",
            "event_family" => "CDP",
            "payload"=> [
            "conversion_identifier" => "Lead",
            "email" => $mail,
            "tags" => $tags,
            "traffic_source" => "(not set)",
            "traffic_medium" => "direct",
            "name" => $name
            ]
        ],
        'headers' => [
            'accept' => 'application/json',
            'authorization' => "Bearer $auth_token",
            'content-type' => 'application/json'
        ],
    ]);
    echo $response->getBody();
}
$auth_token = "eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJpc3MiOiJodHRwczovL2FwaS5yZC5zZXJ2aWNlcyIsInN1YiI6IlFkTEljNjNnSGZkcEpPQXA4Q2NMd09tZnEzRWdoRDNMaFNKcjltZFZHYUFAY2xpZW50cyIsImF1ZCI6Imh0dHBzOi8vYXBwLnJkc3RhdGlvbi5jb20uYnIvYXBpL3YyLyIsImFwcF9uYW1lIjoiSW50ZWdyYcOnw6NvIEFQSSBQYWxtaWxoYXMgVGVyYXDDqnV0aWNhcyIsImV4cCI6MTY5ODQxMjUyOSwiaWF0IjoxNjk4MzI2MTI5LCJzY29wZSI6IiJ9.t8mD4jSeSORhQ1utaCPAHGcl7OmWFlsUFmaIGTKKMhpSW0lo2cinBDhpxyBDyqZV4Q3iOwoQpk4Wcu-1I30NBqx1gBBoSHQ0EcCKDQb1eNPBcd4rI6sTZvZQrHs5_74zDAcCMYZWf9fvSWb9UN3DZ-IQaS1v9DN7vaSHGV4228y7-l3QzBJTz1z8nbWWn0ZolDTr6YiRSTclGsbeUSzg2c6HShNHatvSwe2eqzox0BZ9xGUKqF0OWkVFhSuiCqg-gS-rkTdOscE-mbEE9KUxTYjuEMhFltmOGJEhSZSmRoNxNtijQm8-1h9DvZBDM7JR0WC0IefKb5dlC_dV7KxRsA";
post_lead($_POST['user_name'], $_POST['user_email'], $_POST['user_tags']);