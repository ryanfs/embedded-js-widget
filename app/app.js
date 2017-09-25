define(['jquery', 'Ractive', 'rv!templates/template', 'text!css/my-widget_embed.css'], function ($, Ractive, mainTemplate, css) {

  'use strict';

  var app = {
    init: function () {

    var $style = $("<style></style>", {type: "text/css"});
    $style.text(css);
    $("head").append($style);

      // render our main view
      this.ractive = new Ractive({
        el: 'myWidget',
        template: mainTemplate,
        data: {
          loanAmount: 20000,
          interestRate: 2.84,
          months: 60,
          payment: ''
        }
      });

      this.ractive.observe( 'name loanAmount interestRate months', function () {
        var loanAmount = this.get('loanAmount') || 0;
        var interestRate = this.get('interestRate') || 0;
        var months = this.get('months') || 0;

        var interest = (loanAmount * (interestRate * .01)) / months;
        var payment = ((loanAmount / months) + interest).toFixed(2);
        payment = payment.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
        this.set('payment', payment);
      });
    }
  };

  return app;

});
