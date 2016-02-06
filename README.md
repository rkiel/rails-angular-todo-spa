## Rails Angular Todo

#### A simple to-do list experiment with Rails and Angular as a Single Page App

Create the project

```unix
mkdir -p ~/GitHub/rkiel
cd ~/GitHub/rkiel
git clone git@github.com:rkiel/rails-angular-todo-spa.git
cd rails-angular-todo-spa
```

Stage your SSH credentials (for use with Heroku)

```unix
cp ~/.ssh/id_rsa .
cp ~/.ssh/id_rsa.pub .
cp ~/.ssh/known_hosts .
```

Create the vagrant server.

```unix
vagrant up
```

Connect to the vagrant server.

```unix
vagrant ssh rails
cd /vagrant
```

Create the Rails project
```unix
rails new .
echo .vagrant >> .gitignore
echo .rvmrc >> .gitignore
echo node_modules >> .gitignore
rm README.rdoc
git add .gitignore Gemfile* Rakefile app bin config* db lib log public test vendor
git commit -m "rails new"
```

Update Gemfile to be compatable with Heroku.

```ruby
ruby "2.2.4"

gem 'therubyracer', platforms: :ruby

gem 'bcrypt', '~> 3.1.7'

gem 'jwt', '~> 1.5.2'

group :development, :test do
  # Use sqlite3 as the database for Active Record
  gem 'sqlite3'
end

group :production do
  gem 'pg'
end

group :development do
  gem 'netrc'
  gem 'rest-client'
  gem 'heroku-api'
end
```

Install the gems.

```unix
rm -f Gemfile.lock
bundle install
git add Gemfile*
git commit -m "bundle install"
```

Initialize the database.

```unix
rm -f db/development.sqlite3
rm -f db/test.sqlite3
rake db:migrate
rake db:migrate RAILS_ENV=test
git add db/schema.rb
git commit -m "db migrate"
```

Start the rails server.

```unix
rails server -b 192.168.33.10
```

Open up your browser.

[http://192.168.33.10:3000](http://192.168.33.10:3000)

#### Build your application

```unix
rails generate model user first last email:index uuid:index password_digest
```



#### Deploy to heroku

Login to your Heroku account

```unix
heroku auth:login
```

Create a new project

```unix
heroku create
```

Set your secret key

```unix
heroku config:set SECRET_KEY_BASE=`rake secret`
heroku config:get SECRET_KEY_BASE
```

Push your code to Heroku

```unix
git push heroku master
```

Run your migrations

```unix
heroku run rake db:migrate
```

Open up your browser.

[https://still-hollows-56878.herokuapp.com](https://still-hollows-56878.herokuapp.com)


##### Resources

Video

* [Railscast #405 AngularJS](http://railscasts.com/episodes/405-angularjs)
* [Ditching Cookies for JSON Web Tokens](https://www.youtube.com/watch?v=X7t2pdJYHNI)

Text

* [Authenticating your Angular / Rails App with JSON Web Tokens](http://adamalbrecht.com/2014/12/04/add-json-web-token-authentication-to-your-angular-rails-app/)
* [AngularJS on Rails 4 - Part 2](http://coderberry.me/blog/2013/04/23/angularjs-on-rails-4-part-2/)
* [Authentication with Rails, JWT and ReactJS](http://nebulab.it/blog/authentication-with-rails-jwt-and-react/)
* [Where to Store Your JWTs - Cookies vs HTML5 Web Storage](https://stormpath.com/blog/where-to-store-your-jwts-cookies-vs-html5-web-storage/)
* [Secure Your REST API... The Right Way](https://stormpath.com/blog/secure-your-rest-api-right-way/)
* [Angular Style Guide](https://github.com/johnpapa/angular-styleguide)
* [Backend Integration with Ruby on Rails](http://fdietz.github.io/recipes-with-angular-js/backend-integration-with-ruby-on-rails/index.html)
* [BUILDING AWESOME RAILS APIS: PART 1]\](http://collectiveidea.com/blog/archives/2013/06/13/building-awesome-rails-apis-part-1/)
* [Ruby On Rails Tutorial](https://www.railstutorial.org/book/beginning)



