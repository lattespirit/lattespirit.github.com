{% if site.disqus %}
	{% if page.id %}
    <div>
        <Disqus />
    </div>
	{% endif %}	
<script>
    var disqus_config = function () {
        this.page.url = "{{ site.url }}{{ page.url }}";
        this.page.identifier = "{{page.id | remove:'/'}}";
    };
    (function() {
        var d = document, s = d.createElement('script');
        
        s.src = 'https://lattespirit.disqus.com/embed.js';
        
        s.setAttribute('data-timestamp', +new Date());
        (d.head || d.body).appendChild(s);
    })();
</script>
<noscript>Please enable JavaScript to view the <a href="https://disqus.com/?ref_noscript" rel="nofollow">comments powered by Disqus.</a></noscript>
{% endif %}
