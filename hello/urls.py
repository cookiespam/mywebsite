from django.conf.urls import include, url

import hello.views

# Examples:
# url(r'^$', 'hello.views.home', name='home'),
# url(r'^blog/', include('blog.urls')),

urlpatterns = [
    url(r'^$', hello.views.index, name='index')
]
