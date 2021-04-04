use Mojolicious::Lite -signatures;

# Render template "index.html.ep" from teh DATA section
get '/' => sub ($c) {
    $c->render(template => 'index')
};

# Websocket service used by the template to extract the title from a website
websocket '/title' => sub ($c) {
    $c->on(message => sub ($c, $msg) {
        my $title = $c->get($msg)->result->dom->at('title')->text;
        $c -> ($title);
    });
};

app->start;

__DATA__

@@ index.html.ep

% my $url = url_for 'title';

<script>
    var ws = new Websocket('<%= $url->to_abs %>');
    ws.onmessage = function (event) {document.body.innerHtml += event.data};
    ws.onopen    = function (event) {ws.send('https://mojolicious.org')};
</script>

    <p>hello world
