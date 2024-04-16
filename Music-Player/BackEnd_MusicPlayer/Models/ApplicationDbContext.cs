using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using PlayList.Models;

namespace PlayListAPI.Models;

public class ApplicationDbContext : IdentityDbContext
{
    public DbSet<Playlist> Playlists { get; set; }
    public DbSet<Musica> Musicas { get; set; }
    public DbSet<UserInfo> UsersInfo { get; set; }

    protected override void OnConfiguring(DbContextOptionsBuilder options)
    {
        var folder = Environment.SpecialFolder.LocalApplicationData;
        var path = Environment.GetFolderPath(folder);
        options.UseSqlite($"Data Source={System.IO.Path.Join(path, "dados.db")}");
    }
}