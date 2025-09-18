import Link from 'next/link'
import Image from 'next/image'
import {
  Card,
  CardContent,
  CardActions,
  Typography,
  Stack,
  Button,
  Box
} from '@mui/material'
import ArticleOutlined from '@mui/icons-material/ArticleOutlined'
import AccessTimeOutlined from '@mui/icons-material/AccessTimeOutlined'
import CategoryOutlined from '@mui/icons-material/CategoryOutlined'

export default function PostCard({ article: a, elevation = 1 }) {
  return (
    <Card component="article" elevation={elevation} className="post-card">
      {a?.image && (
        <Box sx={{ position: 'relative', width: '100%', height: 180, borderTopLeftRadius: 'var(--radius-lg)', borderTopRightRadius: 'var(--radius-lg)', overflow: 'hidden' }}>
          <Image
            src={a.image || '/og-default.jpg'}
            alt={a.title}
            fill
            sizes="(max-width: 768px) 100vw, 50vw"
            style={{ objectFit: 'cover' }}
            loading="lazy"
          />
        </Box>
      )}
      <CardContent>
        <Typography
          variant="h6"
          component="h2"
          gutterBottom
          sx={{
            '& a': {
              color: 'text.primary',
              textDecoration: 'none'
            },
            '& a:hover': { color: 'primary.main' },
            '& a:visited': { color: 'text.primary' }
          }}
        >
          <Link href={`/artigos/${a.slug}`}>{a.title}</Link>
        </Typography>
        {a.description && (
          <Typography variant="body2" color="text.secondary" gutterBottom>
            {a.description}
          </Typography>
        )}
        <Stack direction="row" spacing={2} sx={{ opacity: 0.85, fontSize: '.85rem' }}>
          {a.category && (
            <Stack direction="row" spacing={0.5} alignItems="center">
              <CategoryOutlined fontSize="small" /> <span>{a.category}</span>
            </Stack>
          )}
          {a.readTime && (
            <Stack direction="row" spacing={0.5} alignItems="center">
              <AccessTimeOutlined fontSize="small" /> <span>{a.readTime} min</span>
            </Stack>
          )}
          {a.date && (
            <time dateTime={a.date}>
              {new Date(a.date).toLocaleDateString('pt-BR')}
            </time>
          )}
        </Stack>
      </CardContent>
      <CardActions>
        <Button
          component={Link}
          href={`/artigos/${a.slug}`}
          size="small"
          endIcon={<ArticleOutlined />}
        >
          Ler artigo
        </Button>
      </CardActions>
    </Card>
  )
}
