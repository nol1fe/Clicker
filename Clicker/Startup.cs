using Microsoft.Owin;
using Owin;

[assembly: OwinStartupAttribute(typeof(Clicker.Startup))]
namespace Clicker
{
    public partial class Startup
    {
        public void Configuration(IAppBuilder app)
        {
            ConfigureAuth(app);
        }
    }
}
