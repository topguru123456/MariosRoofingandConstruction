$path = Join-Path $PSScriptRoot '..\public\images\book-cover.png'
$out = Join-Path $PSScriptRoot '..\public\images\book-cover-front.png'

Add-Type -AssemblyName System.Drawing

$src = [System.Drawing.Image]::FromFile($path)
$x = [int]($src.Width * 0.545)
$w = $src.Width - $x
$h = $src.Height

$bmp = New-Object System.Drawing.Bitmap $w, $h
$g = [System.Drawing.Graphics]::FromImage($bmp)
$g.InterpolationMode = [System.Drawing.Drawing2D.InterpolationMode]::HighQualityBicubic
$rect = New-Object System.Drawing.Rectangle $x, 0, $w, $h
$g.DrawImage($src, 0, 0, $rect, [System.Drawing.GraphicsUnit]::Pixel)
$bmp.Save($out, [System.Drawing.Imaging.ImageFormat]::Png)

$g.Dispose()
$bmp.Dispose()
$src.Dispose()

Write-Output "Saved book-cover-front.png (${w}x${h})"
