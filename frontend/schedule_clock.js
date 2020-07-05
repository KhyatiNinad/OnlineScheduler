// Modified from https://github.com/iamdshri/clockSchedulerJS (GNU License)
// To Port to React and adapt to current requirements
import React from 'react';
import PropTypes from 'prop-types';

export class ScheduleClock extends React.Component {
  constructor(props) {
    super(props);

    this.radius = this.props.size / 2;
    this.drawingContext = null;
    this.draw24hour = this.props.timeFormat.toLowerCase().trim() === "24hour";
    this.drawRoman = !this.draw24hour && this.props.hourFormat.toLowerCase().trim() === "roman";
    this.minutes_flag = true;
    this.meetingArr = this.props.meetings;
    if (typeof this.meetingArr === 'undefined')
      this.meetingArr = [];
    else if (this.meetingArr == null)
      this.meetingArr = [];

      this.state = { time: new Date(), meetingArr: this.meetingArr, width: this.props.size };
    }

  componentDidUpdate(prevProps){
   
    if(JSON.stringify(prevProps.meetings) !== JSON.stringify(this.props.meetings) || prevProps.size !== this.props.size){
      this.meetingArr = this.props.meetings;
      if (typeof this.meetingArr === 'undefined')
      this.meetingArr = [];
    else if (this.meetingArr == null)
      this.meetingArr = [];

      this.radius = this.props.size / 2;
    
      this.drawingContext = this.refs.clockCanvas.getContext('2d');
      this.drawingContext.translate(this.radius, this.radius);
      this.radius *= 0.9;
  
        this.setState({          
          time: new Date(), 
          meetingArr: this.props.meetings,
          width: this.props.size
        });
    }
}
  componentDidMount() {
    this.getDrawingContext();
    this.timerId = setInterval(() => this.tick(), 1000);
  }

  componentWillUnmount() {
    clearInterval(this.timerId);
  }

  getDrawingContext() {
    this.drawingContext = this.refs.clockCanvas.getContext('2d');
    this.drawingContext.translate(this.radius, this.radius);
    this.radius *= 0.9;
  }

  tick() {
    this.setState({ time: new Date(), meetingArr: this.meetingArr  });
    const radius = this.radius;
    let ctx = this.drawingContext;
    this.clearMeetingArea(ctx, radius);
    this.drawClock(ctx, radius);
    this.drawLines(ctx, radius);
    this.meetingArea(ctx, radius);
  }

  drawLines(ctx, radius) {
    ctx.beginPath();
    ctx.strokeStyle = "#AAA";
    ctx.lineWidth = 1;
    ctx.arc(0, 0, radius + 4, 0, 2 * Math.PI);
    ctx.arc(0, 0, radius - 2, 0, 2 * Math.PI);
    ctx.stroke();
  }
  clearMeetingArea(ctx, radius) {
    ctx.beginPath();
    ctx.strokeStyle = "white";
    ctx.lineWidth = 5;
    ctx.arc(0, 0, radius + 4, 0, 2 * Math.PI);
    ctx.arc(0, 0, radius - 2, 0, 2 * Math.PI);
    ctx.stroke();
  }


  drawFace(ctx, radius) {
    ctx.beginPath();
    ctx.shadowBlur = 0;
    ctx.shadowOffsetX = 0;
    ctx.shadowOffsetY = 0;
    ctx.strokeStyle = '#AAA';
    ctx.arc(0, 0, radius * 0.95, 0, 2 * Math.PI);
    ctx.fillStyle = 'white';
    ctx.fill();
    ctx.lineWidth = 1;
    ctx.stroke();
    ctx.beginPath();
    ctx.arc(0, 0, radius * 0.07, 0, 2 * Math.PI);
    ctx.fillStyle = '#000';
    ctx.fill();
  }

  drawNumbers(ctx, radius) {
    var ang;
    var num;
    ctx.font = radius * 0.15 + "px arial";
    ctx.textBaseline = "middle";
    ctx.textAlign = "center";
    for (num = 1; num < 13; num++) {
      ang = num * Math.PI / 6;
      ctx.rotate(ang);
      ctx.translate(0, -radius * 0.85);
      ctx.rotate(-ang);
      ctx.fillText(num.toString(), 0, 0);
      ctx.rotate(ang);
      ctx.translate(0, radius * 0.85);
      ctx.rotate(-ang);
    }
  }
  drawMins(ctx, radius) {
    var i = 3;
    for (i = 0; i < 60; i++) {
      if (i % 5 != 0) {
        ctx.beginPath();
        ctx.shadowBlur = 0;
        ctx.shadowOffsetX = 0;
        ctx.shadowOffsetY = 0;
        ctx.lineWidth = 1;
        ctx.lineCap = "square";
        ctx.strokeStyle = '#AAA';
    
        ctx.arc(0, 0, radius * 0.85, i * (0.5 / 15) * Math.PI, i * (0.5 / 15) * Math.PI);
        ctx.stroke();
      }
    }
  }
  drawTime(ctx, radius) {
    ctx.beginPath();
    var now = new Date();
    var hour = now.getHours();
    var minute = now.getMinutes();
    var second = now.getSeconds();
    ctx.shadowBlur = 0;
    ctx.shadowOffsetX = 0;
    ctx.shadowOffsetY = 0;
    //hour
    hour = hour % 12;
    hour = (hour * Math.PI / 6) +
      (minute * Math.PI / (6 * 60)) +
      (second * Math.PI / (360 * 60));
    ctx.strokeStyle = "#111";
    this.drawHand(ctx, hour, radius * 0.5, radius * 0.07);
    //minute
    minute = (minute * Math.PI / 30) + (second * Math.PI / (30 * 60));
    this.drawHand(ctx, minute, radius * 0.8, radius * 0.07);
    // second
    second = (second * Math.PI / 30);
    this.drawHand(ctx, second, radius * 0.9, radius * 0.02);
  }

  drawHand(ctx, pos, length, width) {
    ctx.beginPath();
    ctx.shadowBlur = 0;
    ctx.shadowOffsetX = 0;
    ctx.shadowOffsetY = 0;
    ctx.strokeStyle = "#111";
    ctx.lineWidth = width;
    ctx.lineCap = "round";
    ctx.moveTo(0, 0);
    ctx.rotate(pos);
    ctx.lineTo(0, -length);
    ctx.stroke();
    ctx.rotate(-pos);
  }

  meetingArea(ctx, radius) {
    ctx.lineWidth = radius * 0.07;
    ctx.lineCap = "square";
    
    for (var i = 0; i < this.meetingArr.length; i++) {
      ctx.beginPath();
      ctx.lineWidth = 4;
      var start_arr = this.meetingArr[i].startTime.split(':');
      var s_hr = parseInt(start_arr[0]);
      var s_min = parseInt(start_arr[1]);

      var loop = false;
      var end_arr = this.meetingArr[i].endTime.split(':');
      var e_hr = parseInt(end_arr[0]);
      var e_min = parseInt(end_arr[1]);
      if (e_hr == 12 && e_min == 0) {
        loop = false;
      }
      else {
        loop = true;
      }

      var grd = null;
      if (s_hr < 12 && e_hr >= 12 && loop) {
        grd = ctx.createLinearGradient(0, 0, 10, 0);
        grd.addColorStop(0, this.meetingArr[i].startColor);
        grd.addColorStop(1, this.meetingArr[i].endColor);
        ctx.strokeStyle = grd;
        ctx.arc(0, 0, radius + 4, this.getStartingAngle(s_hr, s_min), this.getEndingAngle(e_hr, e_min));
      } else if (s_hr > 12 && e_hr < 12) {
        grd = ctx.createLinearGradient(0, 0, 10, 0);
        grd.addColorStop(0, this.meetingArr[i].startColor);
        grd.addColorStop(1, this.meetingArr[i].endColor);
        ctx.strokeStyle = grd;
        ctx.arc(0, 0, radius - 1.8, this.getStartingAngle(s_hr, s_min), this.getEndingAngle(e_hr, e_min));
      } else if (s_hr > 11) {
        ctx.strokeStyle = this.meetingArr[i].startColor;
        ctx.arc(0, 0, radius + 4, this.getStartingAngle(s_hr, s_min), this.getEndingAngle(e_hr, e_min));
      } else {
        ctx.strokeStyle = this.meetingArr[i].endColor;
        ctx.arc(0, 0, radius - 1.8, this.getStartingAngle(s_hr, s_min), this.getEndingAngle(e_hr, e_min));
      }
      ctx.stroke();
    }
  }
  getStartingAngle(hr, min) {
    if ((hr - 3) < 0) { hr = hr + 12; }
    return ((hr - 3) * 5 * (0.5 / 15) * Math.PI) + (min * (0.5 / 15) * Math.PI / 12);
  }
  getEndingAngle(hr, min) {
    if ((hr - 3) < 0) { hr = hr + 12; }
    return ((hr - 3) * 5 * (0.5 / 15) * Math.PI) + (min * (0.5 / 15) * Math.PI / 12);
  }
  drawClock(ctx, radius) {
    this.drawFace(ctx, radius);
    if (this.minutes_flag) {
      this.drawMins(ctx, radius);
    }
    this.drawNumbers(ctx, radius);
    this.drawTime(ctx, radius);
    //alarm();
  }
  render() {
    return (
      <div className="Clock" style={{ width: String(this.props.size) + 'px', margin: "0px auto" }}>
        <canvas width={this.props.size} height={this.props.size} ref="clockCanvas" />
      </div>
    );
  }
}

ScheduleClock.defaultProps = {
  size: 400, // size in pixels => size is length & width
  timeFormat: "24hour", // {standard | 24hour} => if '24hour', hourFormat must be 'standard'
  hourFormat: "standard" // {standard | roman}
};

ScheduleClock.propTypes = {
  size: PropTypes.number,
  timeFormat: PropTypes.string,
  hourFormat: PropTypes.string
};
