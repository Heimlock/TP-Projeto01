var ig = {};
// !!! USE YOUR OWN TOKEN
ig.token = '7523095.310e263.0821e92409004c668eac7c33a66e5090';

ig.init = function() {
  $('.instagram').each(function(i) {
    var args = {};
    args.container = $(this);
    args.userid = args.container.data('userid');
    args.limit = args.container.data('limit');
    args.feedurl = 'https://api.instagram.com/v1/users/'+args.userid+'/media/recent/?access_token='+ig.token+'&count='+args.limit+'&callback=?';
    args.html = '';
    // PASS ARGS TO QUERY
    ig.query(args);
  });
}

ig.query = function(args) {
  $.getJSON(args.feedurl, {}, function(data) {
		// PASS QUERY DATA TO BUILDER
		ig.build(data, args);
	});
}


ig.build = function(data, args) {
  
  $.each(data.data,function (i,item) {
    var thumb = item.images.low_resolution.url;
    var img = item.images.standard_resolution.url;
    //get 1280 size photo [hack until avail in api]
    var hires = img.replace('s640x640', '1080x1080');
    args.html += '<figure class="image"><img src="'+thumb+'" alt="Image"></figure>';
    // PASS TO OUTPUT
    ig.output(args);
  });
}

ig.output = function(args) {
  args.container.html(args.html);
}

ig.view = {
  viewer: $('.igviewer'),
  image: $('.igviewer img'),
  open: function(img) {
    ig.view.viewer.removeClass('hidden');
    ig.view.image.attr('src', img); 
  },
  close: function() {
    ig.view.viewer.addClass('hidden');
    ig.view.image.attr('src', ''); 
  }
}

ig.init();
