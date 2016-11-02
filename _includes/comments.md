{% if site.disqus %}
	{% if page.id %}
	<div id="disqus_thread"></div>
	{% endif %}	
	<script type="text/javascript">
	    /* * * CONFIGURATION VARIABLES * * */
	    var disqus_shortname = 'lattespirit';
	    var disqus_identifier = '{{page.id | remove:'/'}}';
	    var disqus_title = '{{ page.title }}';
	    var disqus_url = '{{ site.url }}{{ page.url }}';
	    
	    /* * * DON'T EDIT BELOW THIS LINE * * */
	    (function() {
	        var dsq = document.createElement('script'); dsq.type = 'text/javascript'; dsq.async = true;
	        dsq.src = '//' + 'lattespirit.com/js/embed.js';
	        (document.getElementsByTagName('head')[0] || document.getElementsByTagName('body')[0]).appendChild(dsq);
	    })();
	</script>
{% endif %}
