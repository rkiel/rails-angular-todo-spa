## Rails Angular Todo

#### A simple to-do list experiment with Rails and Angular


Create the vagrant server.

```unix
vagrant up
```

Connect to the vagrant server.

```unix
vagrant ssh rails
cd /vagrant
```

Update Gemfile to be compatable with Heroku.

```ruby
ruby "2.2.4"

group :development, :test do
  # Use sqlite3 as the database for Active Record
  gem 'sqlite3'
end

group :production do
  gem 'pg'
end
```

Install the gems.

```unix
bundle install
```

Initialize the database.

```unix
rm -f db/development.sqlite3
rm -f db/test.sqlite3
rake db:migrate
rake db:migrate RAILS_ENV=test
```

Start the rails server.

```unix
rails server -b 192.168.33.10
```

Open up your browser.

[http://192.168.33.10:3000](http://192.168.33.10:3000)



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

heroku config:set SECRET_KEY_BASE=`rake secret`
heroku config:get SECRET_KEY_BASE


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

