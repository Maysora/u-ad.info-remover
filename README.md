u-ad.info-remover
=================

A simple jQuery library to remove injected advertisement from u-ad.info

## Requirement

- jQuery (use noConflict when necessary)

## Usage

```javascript
$.slowdyAdsRemover.init({
  existedFunc: function(){
    // advertisement detected, do something here if necessary,
    // for example disabling turbolinks for rails app :
    // $('body').attr('data-no-turbolink', '1')
  },
  cleanFunc: function(){
    // advertisement not detected, do something here if necessary,
    // for example congratulate visitor for not using scumbag ISP
  },
  popup: true, // default: true, set false to disable warning popup
  popupText: 'You\'re using scumbag ISP please change it immediately.' // optional, change popupText
});
```

## License

See [LICENSE](LICENSE)
