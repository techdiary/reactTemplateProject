# Apache

Learnings on setting apache for node server

**LISTEN :** The [`Listen`](https://httpd.apache.org/docs/2.4/mod/mpm_common.html#listen) directive tells the server to accept incoming requests only on the specified port\(s\) or address-and-port combinations. The [`Listen`](https://httpd.apache.org/docs/2.4/mod/mpm_common.html#listen) directive does not implement Virtual Hosts - it only tells the main server what addresses and ports to listen on

**VIRTUALHOST:** [`<VirtualHost>`](https://httpd.apache.org/docs/2.4/mod/core.html#virtualhost) can be used to specify a different behavior for one or more of the addresses or ports.

1. `<VirtualHost>` and `</VirtualHost>` are used to enclose a group of directives that will apply only to a particular virtual host.
2. When the server receives a request for a document on a particular virtual host, it uses the configuration directives enclosed in the `<VirtualHost>` section

#### VirtualHost options

{% tabs %}
{% tab title="ServerName" %}
A [`ServerName`](https://httpd.apache.org/docs/2.4/mod/core.html#servername) should be specified inside each `<VirtualHost>` block. If it is absent, the [`ServerName`](https://httpd.apache.org/docs/2.4/mod/core.html#servername) from the "main" server configuration will be inherited.

> The `ServerName` directive sets the request scheme, hostname and port that the server uses to identify itself

Example:if the name of the machine hosting the web server is `simple.example.com`, but the machine also has the DNS alias `www.example.com` and you wish the web server to be so identified, the following directive should be used: 

```text
ServerName www.example.com
```

  
{% endtab %}

{% tab title="Second Tab" %}

{% endtab %}
{% endtabs %}



