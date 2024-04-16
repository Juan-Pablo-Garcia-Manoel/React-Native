using PlayListAPI.Models;
using PlayList.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace PlayList.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class PlaylistController : ControllerBase
    {
        private readonly ApplicationDbContext db;

        public PlaylistController(ApplicationDbContext db)
        {
            this.db = db;
        }

        [HttpGet]
        public ActionResult<IEnumerable<Playlist>> Get()
        {
            var userId = User.Identity.Name;
            var playlists = db.Playlists.Where(x => x.IdUsuario == userId).ToList();
            return Ok(playlists);
        }

        [HttpGet("{id}")]
        public ActionResult<Playlist> GetId(string id)
        {
            var userId = User.Identity.Name;
            var obj = db.Playlists.FirstOrDefault(x => x.Id == id && x.IdUsuario == userId);

            if (obj == null)
                return NotFound();

            return obj;
        }

        [HttpGet("mestre/{id}")]
        public ActionResult<IEnumerable<Playlist>> GetIdMestre(string id)
        {
            var userId = User.Identity.Name;
            var obj = db.Playlists.Where(x => x.IdUsuario == userId && x.Id == id);

            if (obj == null)
                return NotFound();

            return obj.ToArray();
        }

        [HttpPost]
        public ActionResult<Playlist> Post(Playlist obj)
        {
            var userId = User.Identity.Name;

            if (string.IsNullOrWhiteSpace(obj.Id))
                obj.Id = Guid.NewGuid().ToString();

            obj.IdUsuario = userId;
            db.Playlists.Add(obj);
            db.SaveChanges();

            return CreatedAtAction(nameof(GetId), new { id = obj.Id }, obj);
        }

        [HttpPut("{id}")]
        public IActionResult Put(string id, Playlist obj)
        {
            var userId = User.Identity.Name;

            if (id != obj.Id || userId != obj.IdUsuario)
                return BadRequest();

            db.Playlists.Update(obj);
            db.SaveChanges();

            return NoContent();
        }

        [HttpDelete("{id}")]
        public IActionResult Delete(string id)
        {
            var userId = User.Identity.Name;

            var obj = db.Playlists.FirstOrDefault(x => x.Id == id && x.IdUsuario == userId);

            if (obj == null)
                return NotFound();

            db.Playlists.Remove(obj);
            db.SaveChanges();

            return NoContent();
        }
    }
}
