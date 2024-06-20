> https://www.cnblogs.com/goloving/p/14978490.html

# 总结

1. transform 会使用 GPU 硬件加速，性能更好；position + top/left 会触发大量的重绘和回流，性能影响较大。

2. 硬件加速的工作原理是创建一个新的复合图层，然后使用合成线程进行渲染。

3. 3D 动画 与 2D 动画的区别；2D动画会在动画开始和动画结束时触发2次重新渲染。

4. 使用GPU可以优化动画效果，但是不要滥用，会有内存问题。

5. 理解强制触发硬件加速的 transform 技巧，使用对GPU友好的CSS属性。
