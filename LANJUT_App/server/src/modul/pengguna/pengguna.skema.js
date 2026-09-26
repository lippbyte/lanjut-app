const { z } = require('zod');

const ubahProfilSkema = z.object({
  kelas: z.enum(['10', '11', '12']).nullable().optional(),
  prodi_impian: z.string().trim().max(64).nullable().optional(),
  nama_tampilan: z.string().trim().min(1).max(60).nullable().optional(),
});

module.exports = { ubahProfilSkema };
