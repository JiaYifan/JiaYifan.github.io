const jyfbutton={
    template:`
        <div>
        <h3>自定义button</h3>
        <input type="button" :value="value" :class="['jyfbutton',type]"/>
        </div>
    `,
    props:{
        value:String,
        type:String,
    }
}