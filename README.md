# PennAppsXX

## Oxymora: Quest of the Rainbow Arsonist

Submitted for PennAppsXX  
[https://devpost.com/software/oxymora](https://devpost.com/software/oxymora)  
Awards: Top 30 Hack of PennAppsXX

### Inspiration

All of the popular \*.io suite of HTML5 games are simple in their mechanics and playstyles; this is a quick tech demo to explore what is possible. It's a small snapshot of a much bigger world that I can only hope to create and complete, but the journey of a thousand miles begins with a single step.

### Game Engine

The game engine of Oxymora was built in-house, during the 36-hour hacking period of PennAppsXX. Everything, from the physics of the objects, to the rendering of sprites, was built from pure JavaScript. This was in line with my goal of understanding every little part of my game engine, as to make it portable to other languages for future server integration.

### Gameplay

The gamplay mechanics was inspired by *Terraria* (2011) and *Battleblock Theater* (2013), with movement and control schemes taking pages out of each of their playbooks. The boss and its attack pattern are reminsicent of *Terraria*'s Calamity Mod, and the keyboard controls are based on the platforming controls of BBT. The game was meant to played in a 16:9 aspect ratio, and will take on the size of the browser window.

#### Attack Mechanics

You can only fire in the four cardinal directions (up, down, left, right). There are two types of fireballs. Ice-infused fireballs are an offensive projectile, being blue, fast-moving, and high-damage. Health-infused fireballs are utility projectiles, being green, slower, and low-damage. They, however, heal you for 1 health on contact with an enemy.

#### Boss Mechanics

The boss has three different phases.

**Idle**  
The boss moves towards you; any contact with the boss will instantly kill you.

**Phase Shift**  
The boss will turn invisible. During the time that it is transparent, it can not be damaged, nor can it deal damage to you. Once it apparates once again, it will be in a new location, within a 300 pixel radius of the player. 

**Sicko Mode**  
The boss will spawn several different fireballs in criss-crossing directions, with gaps between the projectiles for you to dodge in between. The fireballs will not start moving immediately, giving the player time to identify the gaps and stay within them.

#### Controls

**Movement**  
Left Arrow - Move Left  
Right Arrow - Move Right  
Space - Jump/Fly  

**Attacks**  
W - Fireball Upwards  
A - Fireball Left  
S - Fireball Down  
D - Fireball Right  
\[ or \] - Switch Weapons
