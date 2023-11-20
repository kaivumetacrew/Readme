package com.example.sampleapp

import android.content.Intent
import android.os.Bundle
import androidx.appcompat.app.AppCompatActivity
import vn.mc.tdinews.TdiNews
class SplashActivity : AppCompatActivity() {

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.splash)

        // you can wait for the sdk to complete to move to the next screen
        // SDK가 완료되어 다음 화면으로 이동할 때까지 기다릴 수 있습니다.
        TdiNews.Builder(this)
            .setClientId("IANCT-TEST")
            .initSDK {
                startActivity(Intent(this, MainActivity::class.java))
                finish()
            }

        // or no need like this block
        // 또는 이 블록과 같은 필요가 없습니다.
//        TdiNews.Builder(this)
//            .setClientId("IANCT-TEST")
//            .initSDK {
//            }
//        startActivity(Intent(this, MainActivity::class.java))
//        finish()

    }
}