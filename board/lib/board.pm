package board;
use Mojo::Base 'Mojolicious', -signatures;

# This method will run once at server start
sub startup ($self) {

  # Load configuration from config file
  my $config = $self->plugin('NotYAMLConfig');

  # Configure the application
  $self->secrets($config->{secrets});

  # Router
  my $r = $self->routes;

  # Normal route to controller
  
  $r->get('/')->to('ControllerOne#displayLogin');
  $r->post('/login')->to('ControllerOne#validUser');
  $r->any('/logout')->to('ControllerOne#logout');

  my $authorized = $r->under('/')->to('ControllerOne#alreadyLoggedIn');
}

1;
