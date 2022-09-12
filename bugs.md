# Current bugs

## Bullet loctaion not checked

The shoot packets include the players current location, to ensure the bullet is created in the correct location.

This location can be anywhere on the map, allowing you to instanlty shoot players

## Bullet cooldown not checked

You can fire as often as you want

## Invunrable if you dont send input packets.

If you dont send *any* input for the game, you cannot be killed

# Fixed bugs

## Sending invalid input crashes server [FIXED]

Sending

```json
{
	input: 0
}
```

Crashes server

## Can regoin while in game [FIXED]

```json
{
	join: true,
	name: "rejoined",
	armor: "1",
	wepon: "Pistol"
}
```

