var Class = Java.type('java.lang.Class')
var ClassLoader = Java.type('java.lang.ClassLoader')
var File = Java.type('java.io.File')
var Integer = Java.type('java.lang.Integer')
var Scanner = Java.type('java.util.Scanner')
var StandardCharsets = Java.type('java.nio.charset.StandardCharsets')
var System = Java.type('java.lang.System')
var URL = Java.type('java.net.URL')
var URLClassLoader = Java.type('java.net.URLClassLoader')
var URLConnection = Java.type('java.net.URLConnection')
var URLDecoder = Java.type('java.net.URLDecoder')

loadJar(new File("./jarlib/tomcat-embed-core-8.5.24.jar"))
loadJar(new File("./jarlib/tomcat-embed-jasper-8.5.24.jar"))

var Tomcat = Java.type('org.apache.catalina.startup.Tomcat')
var WebResourceRoot = Java.type('org.apache.catalina.WebResourceRoot')
var StandardContext = Java.type('org.apache.catalina.core.StandardContext')
var DirResourceSet = Java.type('org.apache.catalina.webresources.DirResourceSet')
var StandardRoot = Java.type('org.apache.catalina.webresources.StandardRoot')

var Writer = Java.type('java.io.Writer')
var HttpServlet = Java.type('javax.servlet.http.HttpServlet')
var HttpServletRequest = Java.type('javax.servlet.http.HttpServletRequest')
var HttpServletResponse = Java.type('javax.servlet.http.HttpServletResponse')
var Context = Java.type('org.apache.catalina.Context')
var LifecycleException = Java.type('org.apache.catalina.LifecycleException')
// var Class = Java.type('')


function loadJar(/* java.io.File */ file) {
    var method = URLClassLoader.class.getDeclaredMethod("addURL", [URL.class])

    method.setAccessible(true)
    method.invoke(ClassLoader.getSystemClassLoader(), [file.toURI().toURL()])
}

function service(httpRequest, httpResponse) {
    var request = mountRequest(httpRequest)
    var writer = httpResponse.getWriter()

    // httpResponse.setContentType("text/plain")
    // writer.write("Hello, Embedded World from Blue Lotus Software!")
    httpResponse.setContentType("application/json")
    httpResponse.setCharacterEncoding("UTF-8")
    writer.write('{nome: "P Paulo", idade: 13}')
    writer.flush()
    writer.close()
}

function createServer(port) {
        var tomcat = new Tomcat();

        tomcat.setPort(port);

        var ctx = tomcat.addContext("/", new File(".").getAbsolutePath());

        Tomcat.addServlet(ctx, "hello", new HttpServlet() {
            service: function( request,  response) {
                service(request, response)
            }
        });
        ctx.addServletMappingDecoded("/*", "hello")

        tomcat.start()
        print("Running on port " + port +  "...")
        tomcat.getServer().await()

        // java.lang.Thread.sleep(1000)
        // tomcat.stop()
}


function mountRequest(httpRequest) {

    var queryString = (function () {
        var contentType = httpRequest.getContentType() || ""
        var qs = ''

        if (contentType.indexOf("multipart/form-data") == -1) {
            qs = httpRequest.getReader().readLine()
            qs = (qs === null || qs === '') ? httpRequest.getQueryString() : qs
            qs = (qs === null) ? '' : URLDecoder.decode(qs, 'UTF-8')
        }

        return qs
    })()

    var headers = (function() {
        var headerNames = httpRequest.getHeaderNames()
        var headersNameValue = {}

        if (headerNames != null) {
            while (headerNames.hasMoreElements()) {
                var name = headerNames.nextElement()
                headersNameValue[name] =  httpRequest.getHeader(name)
            }
        }

        return headersNameValue
    })()

   /**
    * @function {getParts} - Retorna uma coleção de '*javax.servlet.http.Parts*', que por definição
    *  *"represents a part as uploaded to the server as part of a multipart/form-data 
    * request body. The part may represent either an uploaded file or form data."*
    * @return {type} {description}
    */
    var parts = (function () {
        var contentType = httpRequest.getContentType() || ""

        if (contentType.indexOf("multipart/form-data") == -1)
            return []

       return httpRequest.getParts().toArray()
    })

    return {
        queryString: queryString,

        rest: httpRequest.getRequestURI().replace(this.contextPath, ''),

        contentType: httpRequest.getContentType() || "",

        method: httpRequest.getMethod().toUpperCase(),

        requestURI: httpRequest.getRequestURI(),
        
        pathInfo: httpRequest.getPathInfo(),

        scheme: httpRequest.getScheme(),

        host: httpRequest.getServerName(),

        port: httpRequest.getServerPort(),

        headers: headers,

        contextPath: httpRequest.getContextPath(),

        servletPath: httpRequest.getServletPath(),

        parts: parts
    }

}


exports = {
    test: function name() {
        print("Server OK!")
    },

    createServer: createServer
}