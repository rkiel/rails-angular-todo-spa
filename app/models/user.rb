class User < ActiveRecord::Base

  has_secure_password

  def self.private_fields
    [:id, :password_digest, :uuid]
  end

end
