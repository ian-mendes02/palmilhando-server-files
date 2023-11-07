<?php
require_once('vendor/autoload.php');
$client = new \GuzzleHttp\Client();

function hash_str($str) {
    return hash("SHA256", "$str", false);
};

function verify_token() {

};
function refresh_token() {

};
function post_lead() {

}

$fbver = "v18.0";
$fbid = "3647038675391377";
$fbtoken = "EAAPjcfI2k3MBO0nYcR857QQGybZC2wJBArLNrtkbcaf9HnQk0MZChs13y2O8eIYggZAMCHONVI3YvMaNhs6lxA5YH0pkOJHM40cTz0bZBrpDAD0QthvDnrg3Yhi6F56V2OxMCPjlTjMMsJp016zWRhPhwyc9Wfxq3lb6x29PaiIczM1V5ocNf5LwDB3S8Bd4owZDZD";
$url = "https://graph.facebook.com/$fbver/$fbid/events?access_token=$fbtoken";
$response = $client->request('POST', $url, [
    'body'=> [
        'data'=> [
            'event_name'=> $_POST['event_name'],
            'event_time'=> $_POST['event_time'],
            'action_source'=> 'system_generated',
            'user_data'=> [
                'lead_id'=> $_POST['user_data']['lead_id'],
                'em'=> [hash_str($_POST['user_data']['em'])],
                'fn'=> [hash_str($_POST['user_data']['fn'])],
                'ln'=> [hash_str($_POST['user_data']['ln'])],
            ],
            'lead_event_source'=> 'webhook_palmilhasterapeuticas',
            'event_source'=> 'crm',
        ],
        'headers'=> [
            'accept' => 'application/json',
            'content-type' => 'application/json',
        ]
    ]
]);

$code = $response->getStatusCode();

if ($code == 500) {
    echo $response->ErrorInfo;
} else {
    echo $response->getBody();
}

?>