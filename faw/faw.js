/**
 * Copyright 2016 Google Inc. All Rights Reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

// [START log_event]
function logEvent(name, params) {
  params["obv"]="webview"; // Add public custom parameters
  console.log("%clogEvent "+name,'background:cyan;font-weight:bold;',JSON.stringify(params));
    if (!name) {
      return;
    }
  
    if (window.AnalyticsWebInterface) {
      // Call Android interface; GA4 data stream type: Android App
      window.AnalyticsWebInterface.logEvent(name, JSON.stringify(params));
    } else if (window.webkit
        && window.webkit.messageHandlers
        && window.webkit.messageHandlers.firebase) {
      // Call iOS interface; GA4 data stream type: iOS App
      var message = {
        command: 'logEvent',
        name: name,
        parameters: params
      };
      window.webkit.messageHandlers.firebase.postMessage(message);
    } else {
      // No Android or iOS interface found
      console.log("No native APIs found.");
      // deploy GA Measurement using gtm&dataLayer or gtag if needed; GA4 data stream type: Web
      var ceObj={
        event: name
      };
      if(Object.prototype.toString.call(params) === '[object Object]'){
        if(name=="custom_event"){
          params["event"]=name;
          dataLayer.push(params);
        }else{
          ceObj["ecommerce"]=params;
          dataLayer.push(ceObj);
        }
      }
    }
  }
  // [END log_event]
  
  // [START set_user_property]
  function setUserProperty(name, value) {
    console.log("%csetUserProperty "+name,'background:#009999;font-weight:bold;',value);
    if (!name || !value) {
      return;
    }
  
    if (window.AnalyticsWebInterface) {
      // Call Android interface
      window.AnalyticsWebInterface.setUserProperty(name, value);
    } else if (window.webkit
        && window.webkit.messageHandlers
        && window.webkit.messageHandlers.firebase) {
      // Call iOS interface
      var message = {
        command: 'setUserProperty',
        name: name,
        value: value
     };
      window.webkit.messageHandlers.firebase.postMessage(message);
    } else {
      // No Android or iOS interface found
      console.log("No native APIs found.");
      // deploy GA Measurement using gtm&dataLayer or gtag if needed
      var upObj={
        "event": "setUserProperty"
      };
      upObj[name]=value;
      dataLayer.push(upObj);
    }
  }
  // [END set_user_property]
  
  /*-++-++++=-++---+-=-++++---=-++++--+=-++++-+-=--+-+++-=-++---++=-++-++++=-++-++-+*/
  document.getElementById("date").innerText=new Date();
  // document.getElementById("event1").addEventListener("click", function() {
  //     console.log("event1");
  //     logEvent("event1", { foo: "bar", baz: 123 });
  // });
  
  // document.getElementById("event2").addEventListener("click", function() {
  //   console.log("event2");
  //     logEvent("event2", { size: 123.456 });
  // });
  
  // 设置用户属性
  document.getElementById("userprop").addEventListener("click", function() {
      setUserProperty("userprop", "custom_value");
      setUserProperty("upv", "FAW "+Date.now());
      setUserProperty("up_1", "up_1 "+Date.now());
      setUserProperty("up_2", "up_2");
  });
  
  // 发送事件
  /*-++-++++=-++---+-=-++++---=-++++--+=-++++-+-=--+-+++-=-++---++=-++-++++=-++-++-+*/
  document.getElementById("customEvent").addEventListener("click", function() {
    logEvent("custom_event", { epa: "v_epa", epb: "v_epb" });
  });
  
  /*-++-++++=-++---+-=-++++---=-++++--+=-++++-+-=--+-+++-=-++---++=-++-++++=-++-++-+*/
  // screen_view
  document.getElementById("screenView").addEventListener("click", function() {
    logEvent("screen_view", { 
      cuserid: "test_cid",
      muserid: "test_mid",
      instance_id: "test_j2b4ezal",
      app_id: "test_2882303761517399893",
      tip: "test_16.28.0.0.2854.94726504",
      ref_tip: "test_",
      page_version: "test_1.0.0",
      tz: "test_GMT+08:00",
      site_country: "test_fr",
      app_platform: "test_app_webview",
      ot_ua: "test_Mozilla/5.0",
      tipA: "16",
      tipB: "28",
      tipC: "0",
      tipC1: "holy",
      tipD: "0",
      tipE: "2854",
      screen_name: "snTest0524" //if needed
     });
  });
  
  // view_item_list
  document.getElementById("viewItemList").addEventListener("click", function() {
    logEvent("view_item_list", {
      item_list_id: "related_products",
      item_list_name: "Related products",
      items: [
        {
          item_id: "SKU_12345",
          item_name: "Stan and Friends Tee",
          affiliation: "Google Store",
          coupon: "SUMMER_FUN",
          currency: "USD",
          discount: 2.22,
          index: 5,
          item_brand: "Google",
          item_category: "Apparel",
          item_category2: "Adult",
          item_category3: "Shirts",
          item_category4: "Crew",
          item_category5: "Short sleeve",
          item_list_id: "related_products",
          item_list_name: "Related Products",
          item_variant: "green",
          location_id: "L_12345",
          price: 9.99,
          quantity: 1
        }
      ]
    });
  });

  // add_to_cart
  document.getElementById("addToCart").addEventListener("click", function() {
    logEvent("add_to_cart", {
      currency: "USD",
      value: 7.77,
      items: [
        {
          item_id: "SKU_12345",
          item_name: "Stan and Friends Tee",
          affiliation: "Google Store",
          coupon: "SUMMER_FUN",
          currency: "USD",
          discount: 2.22,
          index: 5,
          item_brand: "Google",
          item_category: "Apparel",
          item_category2: "Adult",
          item_category3: "Shirts",
          item_category4: "Crew",
          item_category5: "Short sleeve",
          item_list_id: "related_products",
          item_list_name: "Related Products",
          item_variant: "green",
          location_id: "L_12345",
          price: 9.99,
          quantity: 1
        }
      ]
    });
  });

  // purchase
  document.getElementById("purchase").addEventListener("click", function() {
    logEvent("purchase", {
      currency: "USD",
      transaction_id: "T_12345",
      value: 21.09,
      affiliation: "Google Store",
      coupon: "SUMMER_FUN",
      shipping: 3.33,
      tax: 2.22,
      items: [
        {
          item_id: "SKU_12345",
          item_name: "Stan and Friends Tee",
          affiliation: "Google Store",
          coupon: "SUMMER_FUN",
          currency: "USD",
          discount: 2.22,
          index: 5,
          item_brand: "Google",
          item_category: "Apparel",
          item_category2: "Adult",
          item_category3: "Shirts",
          item_category4: "Crew",
          item_category5: "Short sleeve",
          item_list_id: "related_products",
          item_list_name: "Related Products",
          item_variant: "green",
          location_id: "L_12345",
          price: 9.99,
          quantity: 1
        },
        {
          item_id: "SKU_12345",
          item_name: "Stan and Friends Tee",
          affiliation: "Google Store",
          coupon: "SUMMER_FUN",
          currency: "USD",
          discount: 2.22,
          index: 7,
          item_brand: "Google",
          item_category: "Apparel",
          item_category2: "Adult",
          item_category3: "Shirts",
          item_category4: "Crew",
          item_category5: "Short sleeve",
          item_list_id: "related_products",
          item_list_name: "Related Products",
          item_variant: "black",
          location_id: "L_12345",
          price: 9.99,
          quantity: 1
        }
      ]
    })
  });