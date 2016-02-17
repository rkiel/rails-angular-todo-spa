require 'ostruct'

class JsonWebToken

  def self.encode(payload)
    token = JWT.encode(payload, Rails.application.secrets.secret_key_base, 'HS512')

    token
  end

  def self.decode(token)
    payload, header = JWT.decode(token, Rails.application.secrets.secret_key_base)
    payload = HashWithIndifferentAccess.new payload

    payload

  rescue JWT::ExpiredSignature
    nil

  rescue
    # we don't need to trow errors, just return nil if JWT is invalid or expired
    nil
  end

  def self.payload_for ( user, options = {} )
    payload = {
      iss:  'Rails Angular Todo',
      exp:  options[:exp] || 24.hours.from_now.to_i,
      sub:  user.uuid
    }

    payload
  end

  def self.user_from( payload )
    user = OpenStruct.new( uuid: payload["sub"] )

    user
  end
end
