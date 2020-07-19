class Users::RegistrationsController < Devise::RegistrationsController

  def select_signup
  end

  # STEP1
  def new
    @user = User.new
  end

  # STEP2
  def create
    @user = User.new(sign_up_params)
    unless @user.valid?
      redirect_to new_user_registration_path, alert: '入力内容を確認してください'
      return
    end
    session["devise.regist_data"] = {user: @user.attributes}
    session["devise.regist_data"][:user]["password"] = params[:user][:password]
    @destination =  @user.purchase_destinations.build
    render :new_destination
  end

  # ユーザー登録
  def create_destination
    @user = User.new(session["devise.regist_data"]["user"])
    @destination = PurchaseDestination.new(destination_params)
    unless @destination.valid?
      render :new_destination and return
    end
    @user.purchase_destinations.build(@destination.attributes)
    @user.save
    sign_in(:user, @user)
  end

  protected

  def configure_sign_up_params
    devise_parameter_sanitizer.permit(:sign_up, keys: [:attribute])
  end

  def destination_params
    params.require(:purchase_destination).permit(:p_last_name, :p_first_name, :p_first_name_kana, :p_last_name_kana, :p_postcode, :p_prefecture, :p_city, :p_block, :p_building, :p_phone_number)
  end

end
