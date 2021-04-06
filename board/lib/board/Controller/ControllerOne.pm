package board::Controller::ControllerOne;
use Mojo::Base 'Mojolicious::Controller', -signatures;

# This action will render a template
sub welcome ($self) {

  # Render template "example/welcome.html.ep" with message
  $self->render( template => 'myTemplates/main', msg => 'Welcome to the Mojolicious real-time web framework!');
}

1;
