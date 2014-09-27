m = [];
s = [ 0, 3, 5, 7, 10 ];
pl = 0;
mr = Math.random;
mf = Math.floor;

for ( i=0; i<16; i++ )
{
	m[i] = 0;
}

ac = window.AudioContext||window.webkitAudioContext;
ac = new ac();
n = AudioNode;
n.prototype.c = n.prototype.connect;

co = ac.createOscillator.bind(ac);
cb = ac.createBufferSource.bind(ac);
cf = ac.createBiquadFilter.bind(ac);
cg = ac.createGain.bind(ac);

ap = AudioParam;
ap.prototype.e = ap.prototype.exponentialRampToValueAtTime;
ap.prototype.l = ap.prototype.linearRampToValueAtTime;
ap.prototype.s = ap.prototype.setValueAtTime;

var nb = ac.createBuffer( 1, 4096*4, ac.sampleRate );
d = nb.getChannelData(0);

for ( i=0; i<4096*4; i++ )
{
	d[i] = mr() * 2 - 1;
}

d = ac.createDelay();
d.delayTime.value = (60/138);

g = cg();
g.gain.value = 0.5;

c = ac.createDynamicsCompressor();

d.c( g );
g.c( d );
g.c( c );

c.c( ac.destination );

setInterval((function()
{
	t = ac.currentTime;

	n = m[pl];
	if( n != 0 )
	{
		o = co();
		o.frequency.value = Math.pow( 2, (n-69)/12 ) * 440;
		o.type = "sawtooth";

		a = cg();
		g = a.gain;
		g.s( 1, t );
		g.l( 0, t + 1 );

		f = cf();
		p = f.frequency;
		p.s( 3000+mr()*2000, t );
		p.e( 20, t + 0.6 );
		f.Q.value = 5;

		o.c( a );
		a.c( f );
		f.c( d );

		o.start( t );
		o.stop( t + 0.5 );
	}

	if( pl%4  == 0 )
	{
		o = co();
		f = o.frequency;
		f.s( 200, t );
		f.e( 10, t + 0.25 );

		a = cg();
		g = a.gain;
		g.s( 1.25, t );
		g.l( 0, t + 0.5 );

		o.c( a );
		a.c( c );

		o.start( t );
		o.stop( t + 0.5 );
	}
	else if( (pl+2)%4  == 0 )
	{
		n = cb();
		n.buffer = nb;
		n.loop = true;

		a = cg();
		g = a.gain;
		g.s( 1.25, t );
		g.l( 0, t + 0.2 );

		f = cf();
		p = f.frequency;
		p.s( 2500, t );
		p.e( 500, t + 0.1 );

		n.c( a );
		a.c( f );
		f.c( c );

		n.start( t );
		n.stop( t + 1 );
	}
	else
	{
		o = cb();
		o.buffer = nb;
		o.loop = true;

		f = cf();
		f.type = "highpass";
		f.frequency.value = 8000+mr()*2000;
		f.Q.value = 5;

		o.c( f );
		f.c( c );

		o.start( t );
		o.stop( t + 0.02 );
	}

	if( pl  == 0 )
	{
		i = mf( mr()*16 );

		if( mr() < 0.1 )
		{
			m[i] = 0;
		}
		else
		{
			j = mf( mr()*s.length );
			o = mf( mr()*mr()*3 );
			m[i] = 40 + s[j] + o*12;
		}
	}

	pl = (pl+1)%16;

}) ,60/138*1000/2);

