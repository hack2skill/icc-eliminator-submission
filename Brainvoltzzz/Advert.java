import java.util.*;
import java.awt.Graphics;
import java.awt.image.BufferedImage;
import javax.swing.JFrame;
import javax.imageio.*;

import java.io.File;
import java.io.IOException;

public class Advert {

public static void main(String args[]) throws IOException
{

BufferedImage image = ImageIO.read(new File("Att2.png"));
BufferedImage overlay = ImageIO.read(new File("icctv.png"));   

// create the new image, canvas size is the max. of both image sizes
int w = Math.max(image.getWidth(), overlay.getWidth());
int h = Math.max(image.getHeight(), overlay.getHeight());
BufferedImage combined = new BufferedImage(w, h, BufferedImage.TYPE_INT_ARGB);

// paint both images, preserving the alpha channels
Graphics g = combined.getGraphics();
g.drawImage(image, 0, 0, null);
g.drawImage(overlay, 0, 0, null);

g.dispose();

// Save as new image
ImageIO.write(combined, "PNG", new File("/Users/vedangbhole/Sih/ICCOutput", "advert.png"));
}
}
