/* global document window */
import Pew from './pew';

/**
 * Class which receives a ship node and
 * functions to control movement and shooting
 */
class Ship {
  /**
   * Create attributes and assign default values to them
   * @param {Element} space
   */
  constructor(space) {
    // How much px our ship will move up and down. Feel free to change this
    this.step = 8;
    // Assign a given space element to our class' attribute
    this.space = space;
    // Determine the height of our space
    this.spaceHeight = space.offsetHeight;
    // Select and assign a ship element
    this.ship = document.querySelector('.ship');
    this.height = this.ship.height;
    this.width = this.ship.width;
    // Default the ship to have 3 lives
    this.lives = 3;
    this.start = null;
    this.topHolder = this.getPosition();

    console.log('Height of space ⭐', space.offsetHeight);
  }

  /**
   * Get the top position of the ship. There are different ways to go about this,
   * so for fun, here we use the computed style's top property (string), remove
   * the px part of it and coerce it into a Number data type.
   */
  getPosition() {
    const top = window.getComputedStyle(this.ship).getPropertyValue('top');

    return Number(top.substring(0, top.indexOf('px')));
  }

  // Move the ship up from its current position
  moveUp() {
    const position = this.getPosition();

    // If it's at the top, don't move the ship
    if (position <= 0) return;

    this.ship.style.top = `${position - this.step}px`;
  }

  // Move the ship down from its current position
  moveDown() {
    const position = this.getPosition();

    if (position >= this.spaceHeight - this.height) return;

    this.ship.style.top = `${position + this.step}px`;
  }

  // Shoot a laser
  shoot() {
    const x = window.getComputedStyle(this.ship).getPropertyValue('left');
    const y = window.getComputedStyle(this.ship).getPropertyValue('top');
    console.log('x:', x, 'y:', y);
    const newPew = new Pew(x, y, this, this.space);

    this.space.appendChild(newPew.pew);
    newPew.move();
  }

  top() {
    return window.parseInt(
      window.getComputedStyle(this.ship).getPropertyValue('top'),
    );
  }

  bottom() {
    return this.top() + 60;
  }

  left() {
    return window.parseInt(
      window.getComputedStyle(this.ship).getPropertyValue('left'),
    );
  }

  right() {
    return this.left() + 60;
  }

  /**
   * Checks if the ship was hit by a creature
   * @param {Creature} creature
   */
  isHit(creature) {
    return (
      creature.left() < this.right()
      && creature.right() > this.left()
      && creature.top() < this.bottom()
      && creature.bottom() > this.top()
    );
  }

  // Lose a life and print out a losing message if we are at 0 lives
  loseLife() {
    if (this.lives === 0) {
      console.log('You Lose');
      return;
    }

    this.lives -= 1;
  }
}

module.exports = Ship;
