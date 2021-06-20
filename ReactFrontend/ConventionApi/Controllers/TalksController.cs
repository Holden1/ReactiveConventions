using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using ConventionApi.Data;
using ConventionApi.Model;
using Microsoft.AspNetCore.Authorization;

namespace ConventionApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class TalksController : ControllerBase
    {
        private readonly ConventionApiContext _context;

        public TalksController(ConventionApiContext context)
        {
            _context = context;
        }

        // GET: api/Talks
        [HttpGet]
        [Authorize("read:talk")]
        public async Task<ActionResult<IEnumerable<Talk>>> GetTalk()
        {
            return await _context.Talk.ToListAsync();
        }

        // GET: api/Talks/5
        [HttpGet("{id}")]
        [Authorize("read:talk")]
        public async Task<ActionResult<Talk>> GetTalk(int id)
        {
            var talk = await _context.Talk.FindAsync(id);

            if (talk == null)
            {
                return NotFound();
            }

            return talk;
        }

        // PUT: api/Talks/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        [Authorize("create:talk")]
        public async Task<IActionResult> PutTalk(int id, Talk talk)
        {
            if (id != talk.Id)
            {
                return BadRequest();
            }

            _context.Entry(talk).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!TalkExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        // POST: api/Talks
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        [Authorize("create:talk")]
        public async Task<ActionResult<Talk>> PostTalk(Talk talk)
        {
            _context.Talk.Add(talk);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetTalk", new { id = talk.Id }, talk);
        }

        // DELETE: api/Talks/5
        [HttpDelete("{id}")]
        [Authorize("create:talk")]
        public async Task<IActionResult> DeleteTalk(int id)
        {
            var talk = await _context.Talk.FindAsync(id);
            if (talk == null)
            {
                return NotFound();
            }

            _context.Talk.Remove(talk);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool TalkExists(int id)
        {
            return _context.Talk.Any(e => e.Id == id);
        }
    }
}
