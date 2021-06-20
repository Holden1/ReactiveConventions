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
    public class ConventionsController : ControllerBase
    {
        private readonly ConventionApiContext _context;

        public ConventionsController(ConventionApiContext context)
        {
            _context = context;
        }

        // GET: api/Conventions
        [HttpGet]

        [Authorize("read:convention")]
        public async Task<ActionResult<IEnumerable<Convention>>> GetConvention()
        {
            return await _context.Convention.ToListAsync();
        }

        // GET: api/Conventions/5
        [HttpGet("{id}")]

        [Authorize("read:convention")]
        public async Task<ActionResult<Convention>> GetConvention(int id)
        {
            var convention = await _context.Convention.FindAsync(id);

            if (convention == null)
            {
                return NotFound();
            }

            return convention;
        }

        // PUT: api/Conventions/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        [Authorize("create:convention")]
        public async Task<IActionResult> PutConvention(int id, Convention convention)
        {
            if (id != convention.Id)
            {
                return BadRequest();
            }

            _context.Entry(convention).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!ConventionExists(id))
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

        // POST: api/Conventions
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        [Authorize("create:convention")]
        public async Task<ActionResult<Convention>> PostConvention(Convention convention)
        {
            _context.Convention.Add(convention);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetConvention", new { id = convention.Id }, convention);
        }

        // DELETE: api/Conventions/5
        [HttpDelete("{id}")]
        [Authorize("create:convention")]
        public async Task<IActionResult> DeleteConvention(int id)
        {
            var convention = await _context.Convention.FindAsync(id);
            if (convention == null)
            {
                return NotFound();
            }

            _context.Convention.Remove(convention);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool ConventionExists(int id)
        {
            return _context.Convention.Any(e => e.Id == id);
        }
    }
}
