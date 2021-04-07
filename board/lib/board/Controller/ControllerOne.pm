package board::Controller::ControllerOne;
use Mojo::Base 'Mojolicious::Controller', -signatures;

# This action will render a template
sub welcome ($self) {

  # Render template "example/welcome.html.ep" with message
  $self->render( template => 'myTemplates/main', msg => 'Welcome to the Mojolicious real-time web framework!');
}

sub displayLogin {

  my $self = shift;

  if (&alreadyLoggedIn($self)) {

    &welcome($self);

  }else{
      $self->render(template => 'myTemplates/login', error_message => "");
  }

}

sub validUser {

    my $self = shift;

    #Hash table with valid users
    my %validUsers = ( "Admin" => "admin123");

    #retrieve username and password from form
    my $user = uc $self->param('username');
    my $password = $self->param('pass');

   #Check if user exists
  if($validUsers{$user}){

    if($validUsers{$user} eq $password) { 

        #Creating session cookies
          $self->session(is_auth => 1);             
          $self->session(username => $user);

        #set session timeout
          $self->session(expiration => 600);

        #Redirect to home page
          &welcome($self); 

      }else{

        #If login fails because of failed password
          $self->render(template => "myTemplates/login", error_message =>  "Invalid password, please try again");
      }
        
   }else{

        #If login fails because no user exists
         $self->render(template => "myTemplates/login", error_message =>  "Please register");
   }

   }

  sub alreadyLoggedIn {

      my $self = shift;

        #Check to see if user is authorized
         return 1 if $self->session('is_auth');

  

        #If no current session redirect to login
         $self->render(template => "myTemplates/login", error_message =>  "You are not logged in");

      return;

    }

  sub logout {

    my $self = shift;

      #Remove session and direct to logout page
       $self->session(expires => 1);  
       $self->render(template => "myTemplates/logout");

  }


 

1;
