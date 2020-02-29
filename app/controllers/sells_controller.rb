class SellsController < ApplicationController

  def new
    @sell = Product.new
    @sell.images.new     #imageモデルの空のインスタンス生成

    @categories = Category.all
    @shippings = Shipping.all
  end

  def create
    @sell = Product.new(product_params)
    if @sell.save
      flash.now[:alert] = '出品完了しました。'
    else
      render :new
    end
  end
 
  def show
    @sell = Product.find(params[:id])
  end

  def edit
  end

  def select_category_middle
    @middle_categories = Category.where(ancestry: params[:keyword])
    respond_to do |format|
      format.html
      format.json
    end
  end

  def select_category_small
    @small_categories = Category.find(params[:keyword]).children
    respond_to do |format|
      format.html
      format.json
    end
  end
  
  def destroy
    sell = Product.find(params[:id])
    unless sell.destroy
      flash.now[:alert] = '削除は完了していません。'
      respond_to sell_path(sell)
    end
  end


  def select_shipping_method
    @shipping_method = Shipping.where(ancestry: params[:keyword])
    respond_to do |format|
      format.html
      format.json
    end
  end

  private

  def product_params
    params.require(:product).permit(:name, :description, :category_id, :shipping_id, :shipping_where, :shipping_day, :price, :condition, brand_attributes:[:name], images_attributes: [:name, :_destroy, :id]).merge(user_id: current_user.id)
  end

end
