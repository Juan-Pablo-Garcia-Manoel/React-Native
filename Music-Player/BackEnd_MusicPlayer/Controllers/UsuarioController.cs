using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authorization;
using PlayList.Models;
using PlayList.Services;

namespace PlayList.Controllers;

[Route("api/[controller]")]
[ApiController]
public class UsuarioController(UserManager<IdentityUser> userManager,
    SignInManager<IdentityUser> signInManager,
    RoleManager<IdentityRole> roleManager, IAuthService authService) : ControllerBase
{
    [HttpPost("Criar")]
    public async Task<ActionResult<string>> CreateUser([FromBody] UserInfo model)
    {
        return await CreateUserExecute(model);
    }

    [Authorize(Policy = "Admin")]
    [HttpPost("CriarAdmin")]
    public async Task<ActionResult<string>> CreateAdminUser([FromBody] UserInfo model)
    {
        return await CreateUserExecute(model, "Admin");
    }

    private async Task<ActionResult<string>> CreateUserExecute(UserInfo userInfo, string roleName = "Member")
    {
        var ret = await authService.Register(userInfo, roleName);

        if (ret.Status == EReturnStatus.Success)
        {
            var retToken = await authService.Login(userInfo);

            if (retToken.Status == EReturnStatus.Success)
                return Ok(retToken.Result);
            else
                return BadRequest(retToken.Result);
        }
        else
            return BadRequest(ret.Result);
    }

    [HttpPost("Login")]
    public async Task<ActionResult<string>> Login([FromBody] UserInfo userInfo)
    {
        var retToken = await authService.Login(userInfo);

        if (retToken.Status == EReturnStatus.Success)
            return Ok(retToken.Result);
        else
            return BadRequest(retToken.Result);
    }
    
    private readonly UserManager<IdentityUser> userManager = userManager;
    private readonly RoleManager<IdentityRole> roleManager = roleManager;
    private readonly SignInManager<IdentityUser> signInManager = signInManager;
    private readonly IAuthService authService = authService;
}