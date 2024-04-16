using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Hosting;
using System;
using System.IO;
using System.Linq;
using PlayListAPI.Models;
using PlayList.Models;

namespace PlayList.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class MusicaController(ApplicationDbContext db, IWebHostEnvironment hostingEnvironment) : ControllerBase
    {
        private readonly ApplicationDbContext db = db;
        private readonly IWebHostEnvironment _hostingEnvironment = hostingEnvironment;

        [HttpGet]
        public ActionResult<IEnumerable<Musica>> Get()
        {
            var userId = User.Identity.Name;
            var musicas = db.Musicas.Where(x => x.IdUsuario == userId).ToList();
            return Ok(musicas);
        }

        [HttpGet("{id}")]
        public ActionResult<Musica> GetId(string id)
        {
            var userId = User.Identity.Name;
            var obj = db.Musicas?.FirstOrDefault(x => x.Id == id && x.IdUsuario == userId);

            if (obj == null)
                return NotFound();

            return obj;
        }

        [HttpGet("mestre/{id}")]
        public ActionResult<IEnumerable<Musica>> GetIdMestre(string id)
        {
            var userId = User.Identity.Name;
            var obj = db.Musicas?.Where(x => x.IdUsuario == userId && x.Id == id);

            if (obj == null)
                return NotFound();

            return obj.ToArray();
        }

        [HttpPost]
        public ActionResult<Musica> Post([FromForm] Musica obj)
        {
            var userId = User.Identity.Name;

            if (string.IsNullOrWhiteSpace(obj.Id))
                obj.Id = Guid.NewGuid().ToString();

            obj.IdUsuario = userId;

            db.Musicas.Add(obj);
            db.SaveChanges();

            return CreatedAtAction(nameof(GetId), new { id = obj.Id }, obj);
        }

        [HttpPut("{id}")]
        public IActionResult Put(string id, [FromForm] Musica obj)
        {
            var userId = User.Identity.Name;

            // Certifique-se de que o usuário autenticado é o proprietário da música
            var musica = db.Musicas.FirstOrDefault(x => x.Id == id && x.IdUsuario == userId);

            if (musica == null)
                return NotFound();

            // Atualize os outros campos
            musica.Nome = obj.Nome;
            musica.Link = obj.Link;

            db.SaveChanges();

            return NoContent();
        }

        [HttpDelete("{id}")]
        public IActionResult Delete(string id)
        {
            var userId = User.Identity.Name;

            var obj = db.Musicas.FirstOrDefault(x => x.Id == id && x.IdUsuario == userId);

            if (obj == null)
                return NotFound();

            db.Musicas.Remove(obj);
            db.SaveChanges();

            return NoContent();
        }
    }
}
