$(function () {
  // ルールの追加
  var methods = {
    selectbox: function (value, element, arg) {
      return arg !== value;
    }
  }
  // メソッドの追加
  $.each(methods, function (key) {
    $.validator.addMethod(key, this);
  });

  $("#sell-form").validate({
    // ルールの作成(ルール内容はmessage_ja.js)
    rules: {
      "product[name]"                     : { required: true, maxlength: 40 },
      "product[description]"              : { required: true, maxlength: 1000 },
      "category_large[category_large]"    : { selectbox: ""},
      "category_middle[category_middle]"  : { selectbox: ""},
      "product[category_id]"              : { selectbox: "" },
      "product[condition]"                : { selectbox: "" },
      "product[shipping_burden]"          : { selectbox: "" },
      "product[shipping_id]"              : { selectbox: "" },
      "product[shipping_burden]"          : { selectbox: "" },
      "product[shipping_where]"           : { selectbox: "" },
      "product[shipping_day]"             : { selectbox: "" },
      "product[price]"                    : { required: true, number: true, min: 300, max: 9999999 }
    },
    // バリデーションエラーメッセージのカスタム
    messages: {
      "product[price]"                    : { min: "¥300以上の金額を入力してください。", max: "¥9,999,999以下の金額を入力してください。" }
    },

    // 表示場所の変更
    errorPlacement: function(error, element){
      if(element.attr('name') === "category_large[category_large]"){
        error.insertAfter('.sell-main__product-details__contents__category__title.category-box__large');
      } 
      else if(element.attr('name') === "category_middle[category_middle]") {
        error.insertAfter('.sell-main__product-details__contents__category__title.category-box__middle');
      }
      else if(element.attr('name') === "product[category_id]") {
        error.insertAfter('.sell-main__product-details__contents__category__title.category-box__small');
      }
      else if(element.attr('name') === "product[price]") {
        error.insertAfter('.sell-main__product-price__contents__sales-profit');
      }
      else {
        error.insertAfter(element);
      }
    },
    errorClass: "invalid", // バリデーションNGの場合に追加するクラス名の指定
    errorElement: "p", // エラーメッセージの要素種類の指定
    validClass: "valid", // バリデーションOKの場合に追加するクラス名の指定
  });

  // 入力欄をフォーカスアウトしたときにバリデーションを実行
  $("#sell-form-name", "#sell-form-description", "#category_large_category_large", "#category_middle_category_middle", "#product_category_id", "#product_condition", "#product_shipping_id", "#product_shipping_where", "#product_shipping_burden","#product_shipping_day", "#product_price", "#product_shipping_id").blur(function () {
    $(this).valid();
  });

});